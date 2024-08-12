import { screen } from '@testing-library/react';
import React from 'react';

import ErrorPage from '@/pages/error/components/ErrorPage';
import render from '@/utils/test/render';

/** 스파이 함수 생성 */
const navigateFn = vi.fn();

/** 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 */
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');

  return { ...origin, useNavigate: () => navigateFn };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);

  /** getByrole api 사용하여 버튼의 role을 조회 */
  /** name을 지정하여 목적을 */
  const btn = await screen.getByrole('btn', { name: '뒤로 이동' });

  await user.click(btn);

  expect(navigateFn).toHaveBeenCalledWith(1, -1);
});
