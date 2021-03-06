import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import {
    getSchedulesRequest,
    setSchedulePreference,
} from '../../store/modules/vacine/actions';

import {
    Container,
    Keyboard,
    Content,
    Figure,
    Name,
    Quantity,
    Message,
} from './styles';
import BackButton from '../../components/BackButton';
import ScheduleList from '../../components/ScheduleList';
import { BackHandler } from 'react-native';

import vacineBoard from '../../assets/icons/vacine-board.png';

const VacineDate = ({ navigation }) => {
    const name = useSelector(state => state.vacine.vacine.name);
    const quantity = useSelector(state => state.vacine.vacine.quantity);
    const schedules = useSelector(state => state.vacine.schedules);
    const date = useSelector(state => state.vacine.preferences.date);
    const backTo = navigation.getParam('backTo') || 'SearchPharm';
    const previousStack = navigation.getParam('previousStack');

    const dispatch = useDispatch();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onPressBack);
        dispatch(getSchedulesRequest({ date }));

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onPressBack);
    }, []);

    function goToPage(page, data) {
        navigation.navigate(page, data);
    }

    function onPressBack(event) {
        goToPage(backTo, { backTo: previousStack });
        return true;
    }

    function onPressItem(item) {
        dispatch(setSchedulePreference({ schedule: item.label }));
        goToPage('VacineRegistered');
    }

    return (
        <Container>
            <BackButton
                onPress={() =>
                    goToPage('VacineDate', { backTo: previousStack })
                }
            />
            <Keyboard>
                <Content>
                    <Figure source={vacineBoard} />
                    <Name>{name}</Name>
                    <Quantity>{`${quantity} un`}</Quantity>
                    <Message>Selecione uma horário para vacinação</Message>
                    <ScheduleList
                        label="Horários"
                        items={schedules}
                        onPressItem={onPressItem}
                    />
                </Content>
            </Keyboard>
        </Container>
    );
};

VacineDate.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }),
};

VacineDate.defaultProps = {
    navigation: {
        navigate: () => {},
    },
};

export default VacineDate;
