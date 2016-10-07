/**
 * Created by Elf on 11.06.2016.
 */
import React, { Component } from 'react';
import { Actions, Router, Scene, Reducer, TabBar, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MainPage from './MainPage';
import AddTalkPage from './AddTalkPage';
import ChooseLocation from './../ChooseLocation';
import LocationPickUpMap from './../../components/LocationPickUpMap';
import TabView from './../../components/TabView';
import DimensionUtils from './../../utils/dimentionUtils';

const reducerCreate = params => {
    const defaultReducer = Reducer(params); // eslint-disable-line new-cap
    return (state, action) => defaultReducer(state, action);
};

// define this based on the styles/dimensions you use
const getSceneStyle = function (props, computedProps) { // eslint-disable-line no-unused-vars
    const style = {
        flex: 1,
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
        backgroundColor: '#E6EAED',
    };

    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : DimensionUtils.getHeightDimInPerc(10);
        style.marginBottom = computedProps.hideTabBar ? 0 : DimensionUtils.getHeightDimInPerc(8);
    }
    return style;
};

const titleStyle = {
    fontSize: DimensionUtils.getHeightDimInPerc(5),
    fontFamily: 'animated',
    top: DimensionUtils.getHeightDimInPerc(1.5),
    color: '#FFF',
};

const navBarStyle = {
    backgroundColor: '#4AABF7',
    height: DimensionUtils.getHeightDimInPerc(10),
    borderBottomColor: '#4AABF7',
};

const tabBarStyle = {
    backgroundColor: '#4AABF7',
    height: DimensionUtils.getHeightDimInPerc(8),
};

const backButtonStyle = {
    height: DimensionUtils.getHeightDimInPerc(10),
    paddingLeft: 15,
};

const backButtonIconStyle = {
    height: DimensionUtils.getHeightDimInPerc(7),
    width: DimensionUtils.getWidthDimInPerc(7),
};

const rightButtonStyle = {
    height: DimensionUtils.getHeightDimInPerc(8),
    width: DimensionUtils.getWidthDimInPerc(17),
    alignItems: 'center',
    justifyContent: 'center',
};

const rightButtonTextStyle = {
    fontSize: DimensionUtils.getHeightDimInPerc(2.8),
    color: '#FFF',
};

const getTabBarIcon = (iconName) => {
    return class extends Component {
        render() {
            return <Icon name={iconName}
                         size={DimensionUtils.getHeightDimInPerc(4.8)}
                         color={this.props.selected ? '#FF5722' :'#FFF'} />;
        }
    };
};

export default class App extends Component {
    render() {
        return (
            <Router createReducer={reducerCreate}
                    getSceneStyle={getSceneStyle}>
                <Scene key="root"
                       tabs={true}
                       tabBarStyle={tabBarStyle}>

                    <Scene key="main"
                           component={MainPage}
                           icon={getTabBarIcon('home')}
                           title="Talks Around"
                           initial={true}
                           titleStyle={titleStyle}
                           navigationBarStyle={navBarStyle} />

                    <Scene key="locationsRootTab"
                           icon={getTabBarIcon('place')}
                           titleStyle={titleStyle}
                           navigationBarStyle={navBarStyle}>

                        <Scene key="locationsTab"
                               component={ChooseLocation}
                               title="Locations"
                               rightTitle={'Add'}
                               onRight={()=>{Actions.addLocation();}}
                               rightButtonStyle={rightButtonStyle}
                               rightButtonTextStyle={rightButtonTextStyle}/>

                        <Scene key="addLocation"
                               component={LocationPickUpMap}
                               title="Add Location"
                               leftButtonStyle={backButtonStyle}
                               backButtonImage={require('TalksAround/app/assets/icons/ic_chevron_left.png')}
                               leftButtonIconStyle={backButtonIconStyle}
                               rightTitle={'Save'}
                               onRight={()=>{Actions.pop();}}
                               rightButtonStyle={rightButtonStyle}
                               rightButtonTextStyle={rightButtonTextStyle} />
                    </Scene>

                    <Scene key="tab4"
                           component={TabView}
                           icon={getTabBarIcon('filter-list')}
                           title="Tab #4"/>

                    <Scene key="tab5"
                           component={TabView}
                           icon={getTabBarIcon('near-me')}
                           title="Tab #5"/>

                    <Scene key="tab6"
                           component={TabView}
                           icon={getTabBarIcon('add')}
                           title="Tab #6"/>

                    <Scene key="tab7"
                           component={TabView}
                           icon={getTabBarIcon('settings')}
                           title="Tab #7"/>
                </Scene>
            </Router>
        );
    }
}
