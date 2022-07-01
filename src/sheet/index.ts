import type { FC } from 'react'

export type Cell =
  (undefined | null | boolean | string | number | object)
  | Cell[]

export type Row = Record<string, Cell>
export type Column = Cell[]

export type ConfigPanelProps<Config extends Record<string, unknown>> = {
  config: Config
  onChangeConfig: (apply: (oldConfig: Config) => Config) => void
}

export interface SheetFunction<Func extends (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any, config: Config, ...args: unknown[]) => Promise<any>,
  Config extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * Unique ID
   */
  id: string
  type: 'transform' | 'summary' | 'compute' | 'predict'
  name: string
  func: Func
  defaultConfig: Config
  config?: FC<ConfigPanelProps<Config>>
}

export interface SheetTransformFunction<Config extends Record<string, unknown> = Record<string, unknown>> extends SheetFunction<(
  cells: Cell[], config: Config) => Promise<Cell[]>,
  Config> {
  type: 'transform'
}

export interface SheetPredictFunction<Config extends Record<string, unknown> = Record<string, unknown>> extends SheetFunction<(
  columns: Column[], config: Config) => Promise<Column[]>,
  Config> {
  type: 'predict'
}

export interface SheetSummaryFunction<Config extends Record<string, unknown> = Record<string, unknown>> extends SheetFunction<(
  column: Column, config: Config) => Promise<Cell>,
  Config> {
  type: 'summary'
}

/**
 * read multiple columns, output multiple columns
 */
export interface SheetComputeFunction<Config extends Record<string, unknown> = Record<string, unknown>> extends SheetFunction<// todo
  (sheet: unknown, config: Config) => Promise<unknown>,
  Config> {
  type: 'compute'
}
