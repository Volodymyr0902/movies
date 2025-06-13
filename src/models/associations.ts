import { Star } from './star';
import { Film } from './film';

Film.belongsToMany(Star, {
  through: 'films_stars',
  foreignKey: 'film_id',
  as: 'stars',
});

Star.belongsToMany(Film, {
  through: 'films_stars',
  foreignKey: 'star_id',
  as: 'films',
});

export { Star, Film };
