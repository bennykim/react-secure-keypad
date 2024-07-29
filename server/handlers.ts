import { http, HttpResponse } from 'msw';

import { INTERNAL_SERVER_ERROR, JSON_HEADERS } from './constants';
import { createKeypadResponse } from './data/keypadResponse';
import {
  createAuthDatabase,
  createDatabase,
  getAuthDatabaseById,
  getDatabaseById,
} from './db';
import { areAllCoordsSame } from './utils';
import { withStatus } from './withStatus';

export const handlers = [
  http.post(
    '/api/keypad',
    withStatus(async ({ request }) => {
      try {
        const body = (await request.json()) as RequestBody;
        const { id } = body;
        const entry = getDatabaseById(id);
        const keypadResponse = createKeypadResponse();

        if (entry && entry.verified) {
          keypadResponse.uid = entry.uid;
          createAuthDatabase(entry.uid, keypadResponse.keypad.svgGrid);
        } else {
          createDatabase({
            id: id,
            uid: keypadResponse.uid,
            svgGrid: keypadResponse.keypad.svgGrid,
            coords: [],
            verified: false,
          });
        }

        return HttpResponse.json(keypadResponse, {
          status: 200,
          headers: JSON_HEADERS,
        });
      } catch (error) {
        return HttpResponse.text(INTERNAL_SERVER_ERROR, {
          status: 500,
        });
      }
    })
  ),

  http.post(
    '/api/password',
    withStatus(async ({ request }) => {
      try {
        const body = (await request.json()) as RequestBody;
        const { id, uid, coords } = body;
        const entry = getDatabaseById(id);
        const isAllSame = areAllCoordsSame(coords);

        if (!entry) {
          return HttpResponse.text('잘못된 요청입니다.', {
            status: 404,
          });
        } else if (isAllSame) {
          return HttpResponse.text(
            '모든 숫자가 동일한 비밀번호는 허용하지 않습니다.',
            { status: 400 }
          );
        }

        createDatabase({
          id,
          uid,
          svgGrid: entry.svgGrid,
          coords,
          verified: true,
        });

        return HttpResponse.json(
          { success: true },
          {
            status: 200,
            headers: JSON_HEADERS,
          }
        );
      } catch (error) {
        return HttpResponse.text(INTERNAL_SERVER_ERROR, {
          status: 500,
        });
      }
    })
  ),

  http.post(
    '/api/password/confirm',
    withStatus(async ({ request }) => {
      try {
        const body = (await request.json()) as RequestBody;
        const { id, uid, coords } = body;
        const entry = getDatabaseById(id);
        const authEntry = getAuthDatabaseById(uid);

        if (!entry || !authEntry) {
          return HttpResponse.text('잘못된 요청입니다.', {
            status: 404,
          });
        }

        const validateCoords = coords.every((coord, index) => {
          const { x, y } = coord;
          const refCoord = entry.coords[index];
          return authEntry[x][y] === entry.svgGrid[refCoord.x][refCoord.y];
        });

        if (validateCoords) {
          return HttpResponse.text('비밀번호 인증이 완료되었습니다.', {
            status: 200,
          });
        } else {
          return HttpResponse.text('비밀번호 인증에 실패하였습니다.', {
            status: 400,
          });
        }
      } catch (error) {
        return HttpResponse.text(INTERNAL_SERVER_ERROR, {
          status: 500,
        });
      }
    })
  ),
];
