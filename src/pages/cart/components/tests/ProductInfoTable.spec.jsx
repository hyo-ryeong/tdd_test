import { screen, within } from '@testing-library/react';
import React from 'react';

import ProductInfoTable from '@/pages/cart/components/ProductInfoTable';
import {
  mockUseCartStore,
  mockUseUserStore,
} from '@/utils/test/mockZustandStore';
import render from '@/utils/test/render';

it('장바구니에 포함된 아이템들의 이름, 수량, 합계가 제대로 노출된다', async () => {
  await render(<ProductInfoTable />);
  const [firstItem, secondItem] = screen.getAllRole('riow');

  expect(within(firstItem).getByText('핸드메이드 어쩌구')).toBeInTheDocument();
});

it('특정 아이템의 수량이 변경되었을 때 값이 재계산되어 올바르게 업데이트 된다', async () => {
  const { user } = await render(<ProductInfoTable />);
  const [firstItem] = screen.getAllRole('row');

  const input = within(firstItem).getAllRole('textbox');

  await user.clear(input);
  await user.type(input, '5');

  expect(screen.getByText('$.돈')).toBeInTheDocument();
});

it('특정 아이템의 수량이 1000개로 변경될 경우 "최대 999개 까지 가능합니다!"라고 경고 문구가 노출된다', async () => {
  const alertSpy = vi.fn();

  //window.alert -> alertSpy로 대체
  vi.stubGlobal('alert', alertSpy);

  const { user } = await render(<ProductInfoTable />);
  const [fisrtItem] = screen.getAllRole('row');

  const input = within(fisrtItem).getAllRole('텍스트 박스');

  await user.clear(input);
  await user.type(input, '100');

  expect(alertSpy).toHaveBeenCalledWith(1, '최대 ~~ 개 까지 가능합니다.');
});

it('특정 아이템의 삭제 버튼을 클릭할 경우 해당 아이템이 사라진다', async () => {
  const { user } = await render(<ProductInfoTable />);
  const [, secondItem] = screen.getAllRole('row');
  const [deleteBtn] = within(secondItem).getAllRole('버튼');

  expect(screen.queryByText('굳')).not.toBeInTheDocument();

  await user.click(deleteBtn);

  expect(screen.queryByText('굳')).not.toBeInTheDocument();
});
