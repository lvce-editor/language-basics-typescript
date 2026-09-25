import { KeyCode, KeyModifier } from '@lvce-editor/virtual-dom-worker'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

const getCommand = (shortId: string): any => {
  return {
    args: ['Completions', `Completions.${shortId}`, 0, WidgetId.Completion],
    command: 'Editor.executeWidgetCommand',
  }
}

export const getKeyBindings = (): readonly any[] => {
  return [
    {
      key: KeyCode.DownArrow,
      ...getCommand('focusNext'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.UpArrow,
      ...getCommand('focusPrevious'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Enter,
      ...getCommand('selectCurrent'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.End,
      ...getCommand('focusLast'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Home,
      ...getCommand('focusFirst'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyModifier.CtrlCmd | KeyCode.Space,
      ...getCommand('toggleDetails'),
      when: WhenExpression.FocusEditorCompletions,
    },
    {
      key: KeyCode.Escape,
      ...getCommand('close'),
      when: WhenExpression.FocusEditorCompletions,
    },
  ]
}
