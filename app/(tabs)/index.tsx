import React, { useState } from 'react';
import { 
  View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Rates {
  [key: string]: number;
}

const CurrencyConverterModel = {
  rates: {
    USD: 1,
    EUR: 0.92,
    MXN: 16.5,
  } as Rates,
  convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (!this.rates[fromCurrency] || !this.rates[toCurrency]) return 0;
    return (amount / this.rates[fromCurrency]) * this.rates[toCurrency];
  },
};

export default function CurrencyConverterController(): JSX.Element {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string | null>(null);

  const handleConversion = (): void => {
    const convertedAmount = CurrencyConverterModel.convert(
      parseFloat(amount),
      fromCurrency,
      toCurrency
    );
    setResult(convertedAmount.toFixed(2));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Cantidad:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Ingrese cantidad"
        />
        <Text style={styles.label}>De:</Text>
        <Picker selectedValue={fromCurrency} onValueChange={setFromCurrency}>
          {Object.keys(CurrencyConverterModel.rates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
        <Text style={styles.label}>A:</Text>
        <Picker selectedValue={toCurrency} onValueChange={setToCurrency}>
          {Object.keys(CurrencyConverterModel.rates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
        <Button title="Convertir" onPress={handleConversion} />
        {result && <Text style={styles.result}>Resultado: {result} {toCurrency}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
