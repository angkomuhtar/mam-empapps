import Alert from '@components/alert.component';
import {createContext, useCallback, useContext, useState} from 'react';

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const [options, setOptions] = useState({
    visible: false,
    onOk: null,
    onDissmiss: null,
    type: '',
    message: '',
    title: '',
    quote: '',
    onChangeText: null,
    errText: false,
  });

  const showAlert = useCallback(opts => {
    setOptions(opts);
  }, []);

  return (
    <AlertContext.Provider value={{showAlert}}>
      <Alert
        {...options}
        onOk={() => {
          setOptions({...options, visible: false});
          options.onOk && options.onOk();
        }}
      />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert harus dipakai dalam AlertProvider');
  return ctx;
};
