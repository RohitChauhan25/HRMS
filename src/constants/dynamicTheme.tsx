import { TabProps } from 'interfaces'

type TabColor =
  | '#1D2E88'
  | '#419E6A'
  | '#B2416E'
  | '#F3F5FF'
  | '#E8FCF1'
  | '#FAF3FF'
  | '#4d5cad'
  | '#A5E1BF'
  | '#E1A5D7'
  | '#8896e1'
  | '#fff'
  | '#000'
  | '#f9c51c'
  | ''

export const getTabColor = (props: TabProps): TabColor => {
  switch (props.color) {
    case '#1D2E88':
      return '#1D2E88'
    case '#419E6A':
      return '#419E6A'
    case '#B2416E':
      return '#B2416E'
    default:
      return ''
  }
}

export const getTableColor = (props: TabProps): TabColor => {
  switch (props.color) {
    case '#1D2E88':
      return '#F3F5FF'
    case '#419E6A':
      return '#E8FCF1'
    default:
      return '#FAF3FF'
  }
}

export const getCollapseColor = (props: TabProps): TabColor => {
  switch (props.color) {
    case '#1D2E88':
      return '#4d5cad'
    case '#419E6A':
      return '#A5E1BF'
    default:
      return '#E1A5D7'
  }
}

export const getCategoryColor = (props: TabProps): TabColor => {
  switch (props.color) {
    case '#1D2E88':
      return '#8896e1'
    default:
      return '#fff'
  }
}

export const getCollapseTitleColor = (props: TabProps): TabColor => {
  switch (props.color) {
    case '#1D2E88':
      return '#fff'
    default:
      return '#000'
  }
}

export const getSidebarActiveColor = (props: TabProps): TabColor => {
  switch (props.color) {
    case '#1D2E88':
      return '#f9c51c'
    default:
      return '#fff'
  }
}
