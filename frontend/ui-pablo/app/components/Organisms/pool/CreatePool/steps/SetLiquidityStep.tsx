import { Label } from "@/components/Atoms";
import { DropdownCombinedBigNumberInput } from "@/components/Molecules";
import { FormTitle } from "@/components/Organisms/FormTitle";
import {
  Box,
  Button,
  useTheme,
  BoxProps,
  Typography,
  Theme,
  IconButton,
} from "@mui/material";
import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { useDispatch } from "react-redux";
import FormWrapper from "../FormWrapper";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useMobile } from "@/hooks/responsive";
import { TransactionSettings } from "@/components/Organisms/TransactionSettings";
import { openTransactionSettingsModal } from "@/stores/ui/uiSlice";
import useStore from "@/store/useStore";
import { Assets, getAssetOnChainId } from "@/defi/polkadot/Assets";
import { AssetId } from "@/defi/polkadot/types";
import { DEFAULT_NETWORK_ID } from "@/defi/utils/constants";

const selectLabelProps = (valid: boolean, label: string, balance: string) =>
  ({
    label: label,
    BalanceProps: valid
      ? {
          title: <AccountBalanceWalletIcon color="primary" />,
          balance: balance,
        }
      : undefined,
  } as const);

const priceBoxProps = (theme: Theme) =>
  ({
    mt: 4,
    p: 2,
    borderRadius: 0.66,
    sx: {
      background: theme.palette.gradient.secondary,
    },
  } as const);

const priceLabelProps = (label: string, balance?: string) =>
  ({
    label: label,
    mb: 0,
    TypographyProps: {
      variant: "body1",
      fontWeight: 600,
    },
    BalanceProps: {
      balance: balance,
      BalanceTypographyProps: {
        variant: "body1",
        fontWeight: 600,
      },
    },
  } as const);

const combinedSelectProps = (assetId: AssetId | "none", isMobile?: boolean) =>
  ({
    value: assetId,
    dropdownModal: true,
    forceHiddenLabel: isMobile ? true : false,
    options:
      assetId !== "none"
        ? [
            {
              value: Assets[assetId].assetId,
              label: Assets[assetId].name,
              shortLabel: Assets[assetId].symbol,
              icon: Assets[assetId].icon,
            },
          ]
        : [],
    borderLeft: false,
    minWidth: isMobile ? undefined : 150,
    searchable: true,
    renderShortLabel: true,
  } as const);

const SetLiquidityStep: React.FC<BoxProps> = ({ ...boxProps }) => {
  const theme = useTheme();
  const isMobile = useMobile();
  const dispatch = useDispatch();

  const { createPool, balances, apollo } = useStore();

  const baseAmount = useMemo(() => {
    return new BigNumber(createPool.liquidity.baseAmount);
  }, [createPool.liquidity.baseAmount]);

  const quoteAmount = useMemo(() => {
    return new BigNumber(createPool.liquidity.quoteAmount);
  }, [createPool.liquidity.quoteAmount]);

  const balance1 = useMemo(() => {
    if (createPool.baseAsset !== "none") {
      return new BigNumber(balances[createPool.baseAsset].picasso);
    } else {
      return new BigNumber(0);
    }
  }, [balances, createPool.baseAsset]);

  const balance2 = useMemo(() => {
    if (createPool.quoteAsset !== "none") {
      return new BigNumber(balances[createPool.quoteAsset].picasso);
    } else {
      return new BigNumber(0);
    }
  }, [balances, createPool.quoteAsset]);

  const [valid1, setValid1] = useState<boolean>(false);
  const [valid2, setValid2] = useState<boolean>(false);

  const tokenToUSD1 = useMemo(() => {
    if (createPool.baseAsset !== "none") {
      const onChainId = getAssetOnChainId(
        DEFAULT_NETWORK_ID,
        createPool.baseAsset
      );
      if (onChainId && apollo[onChainId.toString()]) {
        return new BigNumber(apollo[onChainId.toString()]);
      }
    }
    return new BigNumber(0);
  }, [createPool.baseAsset, apollo, balance1]);

  const tokenToUSD2 = useMemo(() => {
    if (createPool.quoteAsset !== "none") {
      const onChainId = getAssetOnChainId(
        DEFAULT_NETWORK_ID,
        createPool.quoteAsset
      );
      if (onChainId && apollo[onChainId.toString()]) {
        return new BigNumber(apollo[onChainId.toString()]);
      }
    }
    return new BigNumber(0);
  }, [createPool.quoteAsset, apollo]);

  const validToken1 = createPool.baseAsset !== "none";
  const validToken2 = createPool.quoteAsset !== "none";

  const usdAmount1 = baseAmount.multipliedBy(tokenToUSD1);
  const usdAmount2 = quoteAmount.multipliedBy(tokenToUSD2);

  const setLiquidity =
    (side: "baseAmount" | "quoteAmount") => (v: BigNumber) => {
      createPool.setLiquidity({ [side]: v.toString() });
    };

  const onNextClickHandler = () => {
    createPool.setSelectable({
      currentStep: createPool.currentStep + 1,
    });
  };

  const onBackHandler = () => {
    createPool.setSelectable({
      currentStep: createPool.currentStep - 1,
    });
  };

  const onSettingHandler = () => {
    dispatch(openTransactionSettingsModal());
  };

  return (
    <FormWrapper {...boxProps}>
      <FormTitle
        title="Set initial liquidity"
        onBackHandler={onBackHandler}
        onSettingHandler={onSettingHandler}
      />

      <Box mt={6}>
        <DropdownCombinedBigNumberInput
          maxValue={balance1}
          setValid={setValid1}
          noBorder
          value={baseAmount}
          setValue={setLiquidity("baseAmount")}
          InputProps={{
            disabled: !validToken1,
          }}
          buttonLabel={validToken1 ? "Max" : undefined}
          ButtonProps={{
            onClick: () => setLiquidity("baseAmount")(balance1),
            sx: {
              padding: theme.spacing(1),
            },
          }}
          CombinedSelectProps={combinedSelectProps(
            createPool.baseAsset,
            isMobile
          )}
          LabelProps={selectLabelProps(validToken1, "Token 1", `${balance1}`)}
        />
        {valid1 && (
          <Typography variant="body2" mt={1.5}>
            {`≈$${usdAmount1}`}
          </Typography>
        )}
      </Box>

      <Box mt={4} textAlign="center">
        <IconButton
          sx={{
            width: 56,
            height: 56,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography variant="h5">+</Typography>
        </IconButton>
      </Box>

      <Box mt={4}>
        <DropdownCombinedBigNumberInput
          maxValue={balance2}
          setValid={setValid2}
          noBorder
          value={quoteAmount}
          setValue={setLiquidity("quoteAmount")}
          InputProps={{
            disabled: !validToken2,
          }}
          buttonLabel={validToken2 ? "Max" : undefined}
          ButtonProps={{
            onClick: () => setLiquidity("quoteAmount")(balance2),
            sx: {
              padding: theme.spacing(1),
            },
          }}
          CombinedSelectProps={combinedSelectProps(
            createPool.quoteAsset,
            isMobile
          )}
          LabelProps={selectLabelProps(validToken2, "Token 2", `${balance2}`)}
        />
        {valid2 && (
          <Typography variant="body2" mt={1.5}>
            {`≈$${usdAmount2}`}
          </Typography>
        )}
      </Box>

      <Box {...priceBoxProps(theme)}>
        <Label
          {...priceLabelProps("Total", `$${usdAmount1.plus(usdAmount2)}`)}
        />
        <Label
          {...priceLabelProps(`Available balance: $${tokenToUSD1.times(balance1).plus(tokenToUSD2.times(balance2)).toFixed(2)}`)}
          mt={0.5}
        />
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onNextClickHandler}
          disabled={!valid1 || !valid2}
        >
          Preview
        </Button>
      </Box>
      <TransactionSettings />
    </FormWrapper>
  );
};

export default SetLiquidityStep;
