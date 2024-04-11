export interface CollectionResponse<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
  'hydra:view': {
    '@id': string;
    '@type': string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:previous': string;
    'hydra:next': string;
  };
}
