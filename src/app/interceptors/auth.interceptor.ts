import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? '';
  const authReq = req.clone({ headers: req.headers.set('token', token) });

  // send the newly created request
  return next(authReq);
};
