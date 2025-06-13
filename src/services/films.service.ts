import { Film, Star } from '../models/associations';
import FilmsRepository from '../repositories/films.repository';
import { CreateFilmReqDto } from '../utils/dtos/req/create-film-req.dto';
import { GetFilmResDto } from '../utils/dtos/res/get-film-res.dto';
import { CreateFilmResDto } from '../utils/dtos/res/create-film-res.dto';
import { GetFilmsResDto } from '../utils/dtos/res/get-films-res.dto';
import { DelFilmResDto } from '../utils/dtos/res/del-film-res.dto';
import { UpdFilmReqDto } from '../utils/dtos/req/upd-film-req.dto';
import { UpdFilmResDto } from '../utils/dtos/res/upd-film-res.dto';
import { FindManyFilmsResult } from '../utils/types/find-many-films-result.type';
import { GetFilmsReqDto } from '../utils/dtos/req/get-films-req.dto';
import { PageAndSort } from '../utils/types/page-sort.type';
import { Interface } from 'readline';
import { unlink } from 'fs/promises';
import createHttpError from 'http-errors';
import { FilmFormats } from '../utils/enums/film-formats.enum';
import { CreateFilmSchema } from '../utils/validation/zod-schemas/create-film.schema';
import { ImportFilmsResDto } from '../utils/dtos/res/import-films-res.dto';
import ParserUtils from '../utils/parser-utils';
import { RawFilmColumns } from '../utils/enums/raw-film-colums.enum';

class FilmsService {
  async find(getFilmsReqDto: GetFilmsReqDto): Promise<GetFilmsResDto> {
    const { star, title, search, ...pageAndSort } = getFilmsReqDto;
    let searchResult: FindManyFilmsResult;

    if (search != null) {
      searchResult = await this.getMergedResults(search, pageAndSort);
    } else if (star != null) {
      searchResult = await FilmsRepository.findByStar(star, pageAndSort);
    } else if (title != null) {
      searchResult = await FilmsRepository.findByTitle(title, pageAndSort);
    } else {
      searchResult = await FilmsRepository.findMany(pageAndSort);
    }

    const { rows: films, count: total } = searchResult;

    return {
      data: films,
      meta: {
        total,
      },
      status: 1,
    };
  }

  async findOne(id: number): Promise<GetFilmResDto> {
    const film: Film = await FilmsRepository.findOneByPkWithRelOrFail(id);
    return {
      data: film,
      status: 1,
    };
  }

  async create(createFilmDto: CreateFilmReqDto): Promise<CreateFilmResDto> {
    const { stars, ...filmData } = createFilmDto;
    const newFilmStars: Star[] =
      await FilmsRepository.getOrCreateAndGetStarsByNames(stars);
    const newFilm: Film = await FilmsRepository.createFilmWithStars(
      filmData,
      newFilmStars
    );
    return {
      data: newFilm,
      status: 1,
    };
  }

  async update(
    id: number,
    updateFilmDto: UpdFilmReqDto
  ): Promise<UpdFilmResDto> {
    const { stars, ...filmData } = updateFilmDto;
    const film: Film = await FilmsRepository.findOneByPkWithRelOrFail(id);

    await Film.update(filmData, {
      where: { id },
    });

    if (stars != null) {
      const updFilmStars: Star[] =
        await FilmsRepository.getOrCreateAndGetStarsByNames(stars);
      await FilmsRepository.updateFilmStars(film, updFilmStars);
    }

    const updatedFilm: Film =
      await FilmsRepository.findOneByPkWithRelOrFail(id);
    return {
      data: updatedFilm,
      status: 1,
    };
  }

  async delete(id: number): Promise<DelFilmResDto> {
    await FilmsRepository.deleteByPkOrFail(+id);
    return { status: 1 };
  }

  async import(file: Express.Multer.File): Promise<ImportFilmsResDto> {
    const beforeImportCount: number = await Film.count();
    const data: Film[] = await this.parseRawFile(file);

    await unlink(file.path);
    const total: number = await Film.count();
    const imported: number = total - beforeImportCount;

    return {
      data,
      meta: {
        imported,
        total,
      },
      status: 1,
    };
  }

  private async parseRawFile(file: Express.Multer.File): Promise<Film[]> {
    const lineReader: Interface = ParserUtils.getLineReaderByPath(file.path);
    const data: Film[] = [];
    const lines: string[] = [];

    for await (const line of lineReader) {
      if (line.trim() !== '') {
        lines.push(line);
      }

      if (line.trim().startsWith(RawFilmColumns.STARS)) {
        const rawFilmData: CreateFilmReqDto = await this.parseRawFilm(lines);
        const { data: film } = await this.create(rawFilmData);
        data.push(film);
        lines.length = 0;
      }
    }

    return data;
  }

  private async parseRawFilm(
    rawFilmLines: string[]
  ): Promise<CreateFilmReqDto> {
    const newFilm: Partial<CreateFilmReqDto> = {};

    for await (const line of rawFilmLines) {
      const [key, value] = ParserUtils.splitByFirst(line, ':');

      switch (key.trim()) {
        case RawFilmColumns.TITLE: {
          newFilm.title = value.trim();
          break;
        }
        case RawFilmColumns.RELEASE_YEAR: {
          newFilm.release_year = Number(value.trim());
          break;
        }
        case RawFilmColumns.FORMAT: {
          newFilm.format = value.trim() as FilmFormats;
          break;
        }
        case RawFilmColumns.STARS: {
          newFilm.stars = value.trim().split(', ');
          break;
        }
        default: {
          createHttpError(400, `Invalid property: ${key}`);
        }
      }
    }

    return CreateFilmSchema.parse(newFilm);
  }

  private async getMergedResults(
    search: string,
    pageAndSort: PageAndSort
  ): Promise<FindManyFilmsResult> {
    const byStar: FindManyFilmsResult = await FilmsRepository.findByStar(
      search,
      pageAndSort
    );
    const byTitle: FindManyFilmsResult = await FilmsRepository.findByTitle(
      search,
      pageAndSort
    );

    return {
      rows: [...byStar.rows, ...byTitle.rows],
      count: byStar.count + byTitle.count,
    };
  }
}

export default new FilmsService();
