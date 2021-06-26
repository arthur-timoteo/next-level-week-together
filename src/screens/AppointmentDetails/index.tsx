import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import {styles} from './styles';

import { AppointmentProps } from '../../components/Appointment';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails(){
    const [widget,setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading,setLoading] = useState(true);
    const [errorMsg,setErrorMsg] = useState('');

    const route = useRoute();
    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget(){
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch({response}) {
            if(response.data.message === 'Widget Disabled'){
                Alert.alert('O Widget do servidor esta desabilitado!');
                setErrorMsg('Não foi possível acessar os dados do servidor porque o Widget está desabilitado');
            }else{
                Alert.alert('Verifique as configurações do servidor!');
                setErrorMsg('Não foi possível acessar os dados do servidor');
            }
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        const message = Platform.OS === 'ios' 
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();
    },[]);

    return(
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelected.guild.owner && widget.instant_invite &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto name="share" size={24} color={theme.colors.primary} />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>{guildSelected.guild.name}</Text>
                    <Text style={styles.subtitle}>{guildSelected.description}</Text>
                </View>
            </ImageBackground>

            {
                loading ? <Load /> : 
                errorMsg === '' ?
                    <>
                        <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length ? widget.members.length : 0}`} />
                        <FlatList 
                            data={widget.members ? widget.members : []}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <Member data={item} />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.members}
                            ListEmptyComponent={() => (		
                                <View style={styles.emptyContainer}>		
                                    <Text style={styles.emptyText}>		
                                        Não há ninguém online agora.		
                                    </Text>		
                                </View>		
                            )}
                        /> 
                    </>
                :   <View style={styles.emptyContainer}>		
                        <Text style={styles.emptyText}>		
                            {errorMsg}		
                        </Text>		
                    </View>	
            }

            <View style={styles.footer}>
                {
                    guildSelected.guild.owner && widget.instant_invite &&
                    <ButtonIcon 
                        title="Entrar na partida" 
                        onPress={handleOpenGuild}
                    />
                }

                {
                    guildSelected.guild.owner && widget.instant_invite == null &&
                    <Text style={styles.textToServerOwner}>Não foi definido um CANAL DE INVITE neste servidor</Text>
                }
            </View>
        </Background>
    )
}