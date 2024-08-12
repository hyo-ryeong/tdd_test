import { screen } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '@/pages/error/components/NotFoundPage';
import render from '@/utils/test/render';

/** 스파이 함수 생성 */
const navigateFn = vi.fn();

/** 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 */
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');

  return { ...origin, useNavigate: () => navigateFn };
});

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  const { user } = await render(<NotFoundPage />);

  /** getByrole api 사용하여 버튼의 role을 조회 */
  /** name을 지정하여 목적을 */
  const btn = await screen.getByrole('btn', { name: 'Home으로 이동' });

  await user.click(btn);

  expect(navigateFn).toHaveBeenCalledWith(1, '/', { replace: true });
});
