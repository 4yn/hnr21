export const TemperatureTypes = {
    TEMP_OK: 'TEMP_OK',
    TEMP_HIGH: 'TEMP_HIGH'
}

export const MaskTypes = {
    MASK_OK: 'MASK_OK',
    MASK_NONE: 'MASK_NONE',
    MASK_FUNNY: 'MASK_FUNNY'
}

export const HandTypes = {
    HAND_NONE: 'HAND_NONE',
    HAND_IC: 'HAND_IC',
    PHONE_SAFE_ENTRY: 'SCREEN_SAFE_ENTRY',
    PHONE_SAFE_ENTRY_FAKE: 'SCREEN_SAFE_ENTRY_FAKE',
    PHONE_TRACE_TOGETHER: 'SCREEN_TRACE_TOGETHER',
    PHONE_TRACE_TOGETHER_FAKE: 'SCREEN_TRACE_TOGETHER_FAKE',
    PHONE_OTHER: 'SCREEN_OTHER',
	TOKEN_OK: 'TOKEN_OK',
	TOKEN_FAKE: 'TOKEN_FAKE',
    TOKEN_BAD: 'TOKEN_BAD'
}

// Maps between trait name and the corresponding enum.
export const Traits = {
    'temperature': TemperatureTypes,
    'mask': MaskTypes,
    'hand': HandTypes
}