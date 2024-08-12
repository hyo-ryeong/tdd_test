import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

/** useNavi 함수가 올바르게 호출되었는가? -> 스파이 함수(이벤트 핸들러할 때 사용)*/

/** 스파이 함수 생성 */
const navigateFn = vi.fn();

/** 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 */
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');

  return { ...origin, useNavigate: () => navigateFn };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  /** 테스트 실행 */
  const { user } = await render(<EmptyNotice />);
  /** 클릭 시뮬레이션 */
  await user.click(screen.getByText('홈으로 가기'));
  /** useNavigate 함수가 원하는 path로 호출되는지 반환 */
  expect(navigateFn).toHaveBeenCalledWith(1, '/');
});
