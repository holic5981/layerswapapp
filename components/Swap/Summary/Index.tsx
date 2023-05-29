import { FC } from "react"
import { useSettingsState } from "../../../context/settings"
import { useSwapDataState } from "../../../context/swap"
import Summary from "./Summary"

const SwapSummary: FC = () => {
    const { layers, currencies } = useSettingsState()
    const { swap } = useSwapDataState()
    const { 
        source_network: source_network_internal_name, 
        source_exchange: source_exchange_internal_name, 
        destination_exchange: destination_exchange_internal_name,
        destination_network: destination_network_internal_name,
        destination_network_asset 
    } = swap
    const source_layer = layers.find(n => n.internal_name === (source_exchange_internal_name ?? source_network_internal_name))
    const destination_layer = layers.find(l => l.internal_name === (destination_exchange_internal_name ?? destination_network_internal_name))
    const asset = source_layer?.assets?.find(currency => currency?.asset === destination_network_asset)
    const currency = currencies?.find(c => c.asset === asset.asset)

    return <Summary
        currency={currency}
        source={source_layer}
        destination={destination_layer}
        requestedAmount={swap?.requested_amount}
        destinationAddress={swap?.destination_address}
        refuelAmount={swap?.refuel_amount}
    />
}
export default SwapSummary