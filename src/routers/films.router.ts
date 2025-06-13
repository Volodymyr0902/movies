import { Router } from 'express';
import FilmsController from '../controllers/films.controller';
import { upload } from '../utils/config/multer-config';
import { FILE_FIELD_NAME } from '../utils/constants/constants';

const FilmsRouter: Router = Router();

FilmsRouter.post('/', FilmsController.create)
  .get('/', FilmsController.find)
  .get('/:id', FilmsController.findOne)
  .patch('/:id', FilmsController.update)
  .delete('/:id', FilmsController.delete)
  .post('/import', upload.single(FILE_FIELD_NAME), FilmsController.import);

export default FilmsRouter;
