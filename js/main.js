import {renderPhotos} from './printElement.js';
import './form-validation.js';
import './photoEffects.js';
import {getServerData} from './servers-api.js';


getServerData(renderPhotos);
