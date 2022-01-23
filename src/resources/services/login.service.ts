/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import config from '../../common/config';
import { UserPayloadModel, TokenDataModel } from '../../types';

/**
 * Get jwt token
 * @param payload - Payload to sign into jwt
 * @returns Promise Task with specified identifier
 */
export const getTokenData = async (
  payload: UserPayloadModel
): Promise<TokenDataModel> => {
  const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
    algorithm: 'HS256',
  });

  const authResult: TokenDataModel = {
    token,
  };

  return authResult;
};
