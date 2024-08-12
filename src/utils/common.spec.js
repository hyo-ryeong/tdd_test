import { pick, debounce } from './common';

describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toEqual({ a: 'A' });
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a', 'b')).toEqual({ a: 'A', b: { c: 'C' } });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

/** 타이머 테스트  */
// 테스트 코드는 비동기 타이머와 무관하게 동기적으로 실행
// -> 비동기 함수가 실행되기 전에 단언이 실행됨
// 타이머 모킹 !

describe('debounce', () => {
  //타이머 모킹 -> 0.3초 흐른 것으로 타이머 조작 -> spy 함수 호출 확인
  beforeEach(() => {
    /** 무조건 teardown에서 모킹을 초기화 해야함 -> 다른 테스트에 영향이 없어야함 */
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    //함수의 호출여부를 사용할 때 spy 함수 사용
    vi.useFakeTimers();

    const spy = vi.fn();

    const debounceFn = debounce(spy, 300);

    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalled();

    debounceFn();
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    //함수의 호출여부를 사용할 때 spy 함수 사용
    vi.useFakeTimers();

    const spy = vi.fn();

    const debounceFn = debounce(spy, 300);

    //첫번째 호출
    vi.advanceTimersByTime(100);
    debounceFn();

    //두번째 호출
    vi.advanceTimersByTime(200);
    debounceFn();

    //세번째 호출
    vi.advanceTimersByTime(300);
    debounceFn();

    //네번째 호출을 했지만 실제 spy 함수는 단 한번만 호출
    expect(spy).toHaveBeenCalled(1);
  });
});
