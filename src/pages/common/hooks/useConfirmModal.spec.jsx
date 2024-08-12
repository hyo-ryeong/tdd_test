import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  //state가 제대로 변경되는지?
  // result : 훅을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태를 추적할 수 있다.
  //rerender : 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다.
  const { result, rerender } = renderHook(useConfirmModal);

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  /** 렌더 훅 내에서 우리 원하는 인자를 넘기기만 하면 됨 */
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(false);
});

/** act 함수를 반드시 호출해야함 ? 테스팅 라이브러리안에 내부적으로 act가 있음 */
/** 직접 상태를 변경해야되는 코드가 있을 때 act로 감싸주어야한다. */
it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(() => useConfirmModal);
  act(() => {
    result.current.isModalOpened();
  });
  expect(result.current.isModalOpened).toBe(true);
});
