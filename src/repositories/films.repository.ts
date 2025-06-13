import { Film, Star } from '../models/associations';
import createHttpError from 'http-errors';
import { IncludeOptions, Op } from 'sequelize';
import { PageAndSort } from '../utils/types/page-sort.type';
import { FindManyFilmsResult } from '../utils/types/find-many-films-result.type';
import { CreateFilmReqDto } from '../utils/dtos/req/create-film-req.dto';

class FilmsRepository {
  async findMany(pageAndSort: PageAndSort): Promise<FindManyFilmsResult> {
    const { sort, order, offset, limit } = pageAndSort;
    return Film.findAndCountAll({
      order: [[sort, order]],
      offset,
      limit,
    });
  }

  async findByStar(
    star: string,
    pageAndSort: PageAndSort
  ): Promise<FindManyFilmsResult> {
    const { sort, order, offset, limit } = pageAndSort;
    const includeOptions: IncludeOptions = {
      model: Star,
      as: 'stars',
      attributes: [],
      where: {
        name: { [Op.like]: `%${star}%` },
      },
      required: true,
    };

    return Film.findAndCountAll({
      include: includeOptions,
      order: [[sort, order]],
      offset,
      limit,
      distinct: true,
    });
  }

  async findByTitle(
    title: string,
    pageAndSort: PageAndSort
  ): Promise<FindManyFilmsResult> {
    const { sort, order, offset, limit } = pageAndSort;
    return Film.findAndCountAll({
      where: {
        title: { [Op.like]: `%${title}%` },
      },
      order: [[sort, order]],
      offset,
      limit,
      distinct: true,
    });
  }

  async findOneByPkWithRelOrFail(id: number): Promise<Film> {
    return Film.findByPk(id, {
      include: {
        model: Star,
        as: 'stars',
        through: {
          attributes: [],
        },
      },
      rejectOnEmpty: createHttpError(404, `Film with id ${id} not found`),
    });
  }

  async getOrCreateAndGetStarsByNames(stars: string[]): Promise<Star[]> {
    return Promise.all(
      stars.map(async (starName: string): Promise<Star> => {
        const [existingStar] = await Star.findCreateFind({
          where: { name: starName },
        });
        return existingStar;
      })
    );
  }

  async createFilmWithStars(
    filmData: Omit<CreateFilmReqDto, 'stars'>,
    stars: Star[]
  ): Promise<Film> {
    const newFilm: Film = await Film.create(filmData);
    await newFilm.addStars(stars);

    return Film.findByPk(newFilm.id, {
      include: {
        model: Star,
        as: 'stars',
        through: {
          attributes: [],
        },
      },
      rejectOnEmpty: true,
    });
  }

  async deleteByPkOrFail(id: number): Promise<void> {
    const film: Film = await Film.findByPk(id, {
      rejectOnEmpty: true,
    });
    await film.destroy();
  }

  async updateFilmStars(film: Film, stars: Star[]): Promise<void> {
    return film.setStars(stars);
  }
}

export default new FilmsRepository();
