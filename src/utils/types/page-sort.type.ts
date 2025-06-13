import { GetFilmsReqDto } from '../dtos/req/get-films-req.dto';

export type PageAndSort = Pick<
  GetFilmsReqDto,
  'sort' | 'order' | 'offset' | 'limit'
>;
