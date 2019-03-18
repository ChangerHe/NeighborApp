export const STATUS_REQUEST = 'REQUEST';
export const STATUS_SUCCESS = 'SUCCESS';
export const STATUS_FAILURE = 'FAILURE';

export function request(prefix) {
  return `${prefix}_${STATUS_REQUEST}`;
}

export function success(prefix) {
  return `${prefix}_${STATUS_SUCCESS}`;
}

export function failure(prefix) {
  return `${prefix}_${STATUS_FAILURE}`;
}
