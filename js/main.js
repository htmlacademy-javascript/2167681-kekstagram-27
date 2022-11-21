import {renderPhotos} from './printElement.js';
import './form-validation.js';
import './photoEffects.js';
import {getServerData} from './servers-api.js';
import {renderFilters} from './postFilter.js';


getServerData((posts) => {
  renderFilters(posts);
  renderPhotos(posts);
});

