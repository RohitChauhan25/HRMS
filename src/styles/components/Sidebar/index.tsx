import styled from 'styled-components'
import {
  getCategoryColor,
  getCollapseColor,
  getCollapseTitleColor,
  getSidebarActiveColor,
  getTabColor,
} from 'constants/dynamicTheme'
import { TabProps } from 'interfaces'

export const Container = styled.div``
export const Wrapper = styled.div<TabProps>`
  display: grid;
  grid-template-rows: 60px auto;
  background-color: ${(props) => (getTabColor(props) ? getTabColor(props) : 'white')};
  border-radius: 16px;
  padding: 20px;
  /* grid-gap: 52px; */
  text-align: left;
  width: 150px;
  min-height: 83vh;
  transition: width 1.5s ease;
  &.collapsed {
    width: 40px;

    .title {
      display: none;
    }
  }
`
export const Collapse = styled.div<TabProps>`
  width: 100%;
  max-width: 180px;
  background-color: ${(props) => getCollapseColor(props)};
  min-height: 46px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: none;
  justify-content: center;
  cursor: pointer;
  .collapsed {
    padding: 0;
  }
`

export const CollapseTitle = styled.div<TabProps>`
  color: ${(props) => getCollapseTitleColor(props)};
  font-size: 14px;
  line-height: 20px;
  text-transform: capitalize;
  white-space: nowrap;
  margin-bottom: 2px;
`

export const BasicLinksContainer = styled.div`
  display: grid;
  /* grid-gap: 40px; */
  margin-top: 40px;
`

export const BasicLinksWrap = styled.div`
  display: grid;
  grid-gap: 5px;
`
export const BasicLinks = styled.div`
  max-width: 180px;
  min-height: 44px;
  align-items: center;
  display: grid;
  grid-gap: 5px;
`
export const Category = styled.div<TabProps>`
  color: ${(props) => getCategoryColor(props)};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
`
export const DataWrapper = styled.div<TabProps>`
  max-width: 180px;
  min-height: 44px;
  display: flex;
  grid-gap: 10px;
  align-items: center;
  padding-left: 11px;
  cursor: pointer;
  &.active {
    background: ${(props) => getSidebarActiveColor(props)};
    color: #010101;
    border-radius: 8px;
    .title {
      color: #010101;
    }
    .icon {
      svg > path {
        fill: #010101;
      }
    }
  }
`

export const CollapseIconWrapper = styled.div<TabProps>`
  width: 20px;
  transition: transform 1.5s ease;
  &.collapsed {
    transform: rotate(180deg);
  }
  &.active {
    path {
      color: #010101;
    }
  }

  svg > path {
    fill: ${(props) => getCollapseTitleColor(props)};
  }
`
export const Icon = styled.div`
  width: 20px;
  transition: transform 1.5s ease;
  &.collapsed {
    transform: rotate(180deg);
  }
  &.active {
    path {
      color: #010101;
    }
  }
`
export const Title = styled.div`
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  text-transform: capitalize;
  white-space: nowrap;
  margin-bottom: 2px;
`
