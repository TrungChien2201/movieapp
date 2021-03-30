import React from 'react';

const FormatMoney = (props: any) => {
    const {money} = props;
    return(
        <>{new Intl.NumberFormat('de-DE').format(money)}đ</>
    )
}

export default FormatMoney;