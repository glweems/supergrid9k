import {
  atom,
  selector,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { GridAreaState } from './grid';
interface GridEditorUiState {
  isControlsOpen: boolean;
  controlPanelWidth: number;
  isSnippetsVisable: boolean;
  codePanelWidth: number;
  activeEditingId: null | GridAreaState['id'];
  isGridItemOpen: boolean;
}
interface UiState {
  isAuthModalOpen: boolean;
  gridEditor: GridEditorUiState;
  navbarHeight: string;
  toolbarHeight: string;
}

export const ui = atom<UiState>({
  key: 'ui',
  default: {
    isAuthModalOpen: false,
    gridEditor: {
      isControlsOpen: true,
      controlPanelWidth: 300,
      isSnippetsVisable: true,
      codePanelWidth: 300,
      activeEditingId: null,
      isGridItemOpen: false,
    },
    navbarHeight: '3.75rem',
    toolbarHeight: '3.5rem',
  },
});

const gridEditorUi = selector({
  key: 'gridEditorUi',
  get: ({ get }) => get(ui).gridEditor,
});

const activeEditingId = selector({
  key: 'activeEditingId',
  get: ({ get }) => get(gridEditorUi).activeEditingId,
  set: ({ set, get }, newValue: string) => {
    const { gridEditor } = get(ui);
    set(ui, (state) => ({
      ...state,
      gridEditor: {
        ...gridEditor,
        activeEditingId: newValue,
        isGridItemOpen: newValue !== null ? true : false,
      },
    }));
  },
});

interface UseGridEditorUi extends GridEditorUiState {
  handleClick: React.MouseEventHandler<any>;
  setGridEditorUiState: SetterOrUpdater<string>;
}

export function useGridEditorUi(): UseGridEditorUi {
  const gridEditorUiState = useRecoilValue(gridEditorUi);
  const activeId = useRecoilValue(activeEditingId);
  const setGridEditorUiState = useSetRecoilState(activeEditingId);
  const handleClick: UseGridEditorUi['handleClick'] = (event) => {
    const { id } = event.currentTarget;
    if (id === activeId) setGridEditorUiState(null);
    setGridEditorUiState(event.currentTarget.id);
  };

  return { ...gridEditorUiState, handleClick, setGridEditorUiState };
}

export function useAuthModal() {
  const [uiState, setUiState] = useRecoilState(ui);
  const { isAuthModalOpen } = uiState;
  function toggle() {
    setUiState((state) => ({
      ...state,
      isAuthModalOpen: !state.isAuthModalOpen,
    }));
  }
  return [isAuthModalOpen, toggle];
}
