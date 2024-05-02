import axios from 'axios';
import {BASE_URL, axiosPrivate} from './Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slice/TokenSlice';
import {useDispatch} from 'react-redux';
