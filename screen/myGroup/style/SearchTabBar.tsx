import React from 'react';
import styled from 'styled-components/native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

type Route = {
  key: string;
  name: string;
  params?: object | undefined;
};

const Container = styled.View`
  background-color: #ffffff;
  margin-horizontal: 20px;
  margin-bottom: 10px;
`;

const TabWrapper = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding-left: 4px;
`;

const TabButton = styled.TouchableOpacity<{isFocused: boolean}>`
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 16px;
  border-bottom-color: none;
`;

const TabText = styled.Text<{isFocused: boolean}>`
  font-size: 16px;
  color: ${props => (props.isFocused ? '#000000' : '#96A0B5')};
`;

export default function SearchTabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  return (
    <Container>
      <TabWrapper>
        {state.routes.map((route: Route, index: number) => {
          const label = route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TabButton
              isFocused={isFocused}
              onPress={onPress}
              key={`tab_${index}`}>
              <TabText isFocused={isFocused}>{label}</TabText>
            </TabButton>
          );
        })}
      </TabWrapper>
    </Container>
  );
}
