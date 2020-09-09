import { atom, useRecoilState } from 'recoil';
interface GridEditorUiState {
  isControlsOpen: boolean;
  controlPanelWidth: number;
  isSnippetsVisable: boolean;
  codePanelWidth: number;
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
    },
  },
});
export interface UseGridEditorUi extends GridEditorUiState {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function useGridEditorUi(): UseGridEditorUi {
  const [uiState, setUiState] = useRecoilState(ui);

  const handleClick: UseGridEditorUi['handleClick'] = (event) => {
    const name = event.currentTarget.name as keyof GridEditorUiState;
    setUiState((state) => ({
      ...state,
      gridEditor: { ...state.gridEditor, [name]: !state.gridEditor[name] },
    }));
  };

  return { ...uiState.gridEditor, handleClick };
}
