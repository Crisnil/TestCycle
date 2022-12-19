import React from 'react';

export const AccountContext = React.createContext();

export const AccountProvider = ({
  children,
}) => {
  const [account, setAccount] = React.useState(null);

  const saveAccount = (data) => {
    setAccount(data)
  }
  return (
    <AccountContext.Provider value={{ account, setAccount, saveAccount }}>
      {children}
    </AccountContext.Provider>
  );
};