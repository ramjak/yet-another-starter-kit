import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { Component, ComponentType } from 'react';
import styles from './MenuItem.module.scss';

interface IProps {
  text: string;
  icon: ComponentType;
}

export class MenuItem extends Component<IProps> {
  public render() {
    return (
      <ListItem button={true}>
        <ListItemIcon>
          <this.props.icon />
        </ListItemIcon>
        <ListItemText
          primary={this.props.text}
          primaryTypographyProps={{ className: styles.menuText }}
        />
      </ListItem>
    );
  }
}
