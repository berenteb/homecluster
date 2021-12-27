import { useContext } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../../utils/settings-context";
import styled from "styled-components";
import { colors } from "../../theme/theme";
import { useForm } from "react-hook-form";
import { Button, ButtonKinds } from "./button";

type SettingsForm = {
  lat: string | number;
  lon: string | number;
  backgroundUrl: string;
};

export function Settings() {
  const {
    locationEnabled,
    setLocationEnabled,
    staticCoordinates,
    setStaticCoordinates,
    settingsOverlayVisible,
    setSettingsOverlayVisible,
    backgroundUrl,
    setBackgroundUrl,
    backgroundEnabled,
    setBackgroundEnabled,
  } = useContext<SettingsContextType>(SettingsContext);
  const defaultValues = {
    lat: staticCoordinates.lat,
    lon: staticCoordinates.lon,
    backgroundUrl: backgroundUrl,
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SettingsForm>({
    defaultValues: defaultValues,
  });
  const saveSettings = (values: SettingsForm) => {
    try {
      const newLat = parseFloat(
        values.lat.toString() || staticCoordinates.lat.toString()
      );
      const newLon = parseFloat(
        values.lon.toString() || staticCoordinates.lon.toString()
      );
      if (!locationEnabled) {
        setStaticCoordinates({ lat: newLat, lon: newLon });
      }
    } catch (e) {
      if (!locationEnabled) {
        setStaticCoordinates({
          lat: staticCoordinates.lat,
          lon: staticCoordinates.lon,
        });
      }
    }
    setBackgroundUrl(values.backgroundUrl);
    setSettingsOverlayVisible(false);
  };
  if (!settingsOverlayVisible) return null;
  return (
    <OverlayWrapper
      id="settingsOverlay"
      onClick={(e) => {
        if (e.target === document.getElementById("settingsOverlay"))
          setSettingsOverlayVisible(false);
      }}
    >
      <OverlayPanelWrapper>
        <h1>Beállítások</h1>
        <h3>Helymeghatározás</h3>
        <CheckBox checked={locationEnabled} onChange={setLocationEnabled} />
        <h3>Háttérkép</h3>
        <CheckBox checked={backgroundEnabled} onChange={setBackgroundEnabled} />
        <i>Kapcsolók állításakor a beállítás azonnal megtörténik!</i>
        <StyledForm onSubmit={handleSubmit(saveSettings)}>
          <h3>Statikus szélességi fok</h3>
          <TextField
            disabled={locationEnabled}
            {...register("lat", {
              pattern: { value: /\d+[.,]\d+$/, message: "Rossz formátum" },
            })}
          />
          {errors.lat && <ErrorText>{errors.lat?.message}</ErrorText>}
          <h3>Statikus hosszúsági fok</h3>
          <TextField
            disabled={locationEnabled}
            {...register("lon", {
              pattern: { value: /\d+[.,]\d+$/, message: "Rossz formátum" },
            })}
          />
          {errors.lon && <ErrorText>{errors.lon?.message}</ErrorText>}
          <h3>Háttérkép URL</h3>
          <TextField {...register("backgroundUrl")} />
          {errors.backgroundUrl && (
            <ErrorText>{errors.backgroundUrl?.message}</ErrorText>
          )}

          <ButtonGroup>
            <Button kind={ButtonKinds.PRIMARY} type="submit">
              Mentés
            </Button>
            <Button
              kind={ButtonKinds.SECONDARY}
              onClick={() => {
                reset(defaultValues);
                setSettingsOverlayVisible(false);
              }}
            >
              Mégse
            </Button>
          </ButtonGroup>
        </StyledForm>
      </OverlayPanelWrapper>
    </OverlayWrapper>
  );
}

export const OverlayWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OverlayPanelWrapper = styled.div`
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  border-radius: 20px;
  background-color: white;
  overflow: auto;
  @media (prefers-color-scheme: dark) {
    background-color: black;
    color: white;
  }
`;

export function CheckBox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <CheckBoxWrapper
      checked={checked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      type="checkbox"
    />
  );
}

export const CheckBoxWrapper = styled.input`
  &[type="checkbox"] {
    position: relative;
    min-width: 50px;
    max-width: 50px;
    min-height: 50px;
    max-height: 50px;
    color: black;
    border: 1px solid gray;
    border-radius: 300px;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  }

  ::before {
    position: absolute;
    content: '';
    display: block;
    width: 7px;
    height: 20px;
    border-style: solid;
    border-color: white;
    border-width: 0 4px 4px 0;
    transform: rotate(45deg);
    @media (prefers-color-scheme: dark) {
      border-color: black;
    }
  }

  :checked {
    color: white;
    border-color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.primaryColor};
    @media (prefers-color-scheme: dark) {
      border-color: ${colors.darkTheme};
      background-color: ${colors.darkTheme};
    }
`;

const TextField = styled.input`
  -webkit-appearance: none;
  border-radius: 20px;
  width: 300px;
  padding: 10px;
  font-size: large;
  margin: 10px;
  border: 1px solid gray;
`;

export const ErrorText = styled.p`
  color: ${colors.danger};
  font-weight: bolder;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
`;
