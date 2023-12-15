import * as signalR from '@microsoft/signalr';

export const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://31.53.16.222:5000/routes')
    // .configureLogging(signalR.LogLevel.Information)
    .build();

export const startConnection = async () => {
    try {
        await connection.start();
        console.log('SignalR Connected.');
    } catch (err) {
        console.log(err);
        setTimeout(startConnection, 5000);
    }
};
