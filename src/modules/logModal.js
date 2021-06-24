// 액션 타입
const SHOW_MODAL = 'logModal/SHOW';
const HIDE_MODAL = 'logModal/HIDE';

// 액션 생성 함수
export const show = () => ({ type: SHOW_MODAL });
export const hide = () => ({ type: HIDE_MODAL });

// 초기 상태 선언
const initialState = {
  show: false,			// 모달 표시 여부
};

// 리듀서
export default function (state = initialState, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return {...state, show: true}
    case HIDE_MODAL:
      return {...state, show: false}
    default:
      return state;
  }
}