import { atom, useRecoilState, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { GridArea } from './grid';
interface GridEditorUiState {
  isControlsOpen: boolean;
  controlPanelWidth: number;
  isSnippetsVisable: boolean;
  codePanelWidth: number;
  activeEditingId: null | GridArea['id'];
}
interface UiState {
  gridEditor: GridEditorUiState;
}

export const ui = atom<UiState>({
  key: 'ui',
  default: {
    gridEditor: {
      isControlsOpen: true,
      controlPanelWidth: 300,
      isSnippetsVisable: true,
      codePanelWidth: 300,
      activeEditingId: null,
    },
  },
});

const gridEditorUi = selector({
  key: 'gridEditorUi',
  get: ({ get }) => get(ui).gridEditor,
});

const activeEditingId = selector({
  key: 'activeEditingId',
  get: ({ get }) => get(gridEditorUi).activeEditingId,
  set: ({ set, get }, newValue) => {
    const { gridEditor } = get(ui);
    set(ui, (state) => ({
      ...state,
      gridEditor: {
        ...gridEditor,
        activeEditingId: newValue,
      },
    }));
  },
});

interface UseGridEditorUi extends GridEditorUiState {
  handleClick: React.MouseEventHandler<any>;
}

export function useGridEditorUi(): UseGridEditorUi {
  const gridEditorUiState = useRecoilValue(gridEditorUi);
  const activeId = useRecoilValue(activeEditingId);
  const setGridEditorUiState = useSetRecoilState(activeEditingId);
  const handleClick: UseGridEditorUi['handleClick'] = (event) => {
    const { id } = event.currentTarget;
    if (id === activeId) return setGridEditorUiState(null);
    return setGridEditorUiState(event.currentTarget.id);
  };

  return { ...gridEditorUiState, handleClick };
}
