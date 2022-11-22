import {renderPhotos} from './print-element.js';
import './form-validation.js';
import './photo-effects.js';
import {getServerData} from './servers-api.js';
import {renderFilters} from './post-filter.js';


getServerData((posts) => {
  renderFilters(posts);
  renderPhotos(posts);
});

