$(document).ready(function() {
    function fetchData(symbol, interval) {
        var apiKey = 'CTOT0BF0D96CK8LU';
        var apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey;
        
        $.ajax({
            url: apiUrl,
            dataType: 'json',
            success: function(data) {
                var signals = generateTradingSignals(data);
                displaySignals(symbol, interval, signals);
            },
            error: function(xhr, status, error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        });
    }

    function generateTradingSignals(data) {
        var emaShort = calculateEMA(data, 15); // Calcola EMA a 15 periodi
        var emaMedium = calculateEMA(data, 30); // Calcola EMA a 30 periodi
        var emaLong = calculateEMA(data, 60); // Calcola EMA a 60 periodi

        var signals = {};

        // Genera segnali di trading in base alle relazioni tra le medie mobili
        if (emaShort > emaMedium && emaMedium > emaLong) {
            signals.entry = 'BUY';
        } else if (emaShort < emaMedium && emaMedium < emaLong) {
            signals.entry = 'SELL';
        } else {
            signals.entry = 'HOLD';
        }

        return signals;
    }

    function calculateEMA(data, period) {
        // Implementa il calcolo dell'EMA (Exponential Moving Average) per il periodo specificato
    }

    function displaySignals(symbol, interval, signals) {
        var signalsHtml = '<h2>Trading Signals for ' + symbol + ' (' + interval + ')</h2>';
        signalsHtml += '<p>Segnale di ingresso: ' + signals.entry + '</p>';
        
        $('#signals').append(signalsHtml);
    }

    fetchData('AAPL', '15min');
    fetchData('AAPL', '30min');
    fetchData('AAPL', '60min');
});
