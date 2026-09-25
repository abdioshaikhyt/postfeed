 function formatUps(number) {
        if(number >= 1000) {
            const numberDividedByAThousand = number/1000;
            const StringNumFixedToOnedp = numberDividedByAThousand.toFixed(1);
            return `${StringNumFixedToOnedp}k`;
        }
        return `${number}` ;
    }

export {formatUps};