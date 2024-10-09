package com.skydoom.treading.model;

import com.skydoom.treading.domain.VerificationType;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class TwoFactorAuth {
    private boolean isEnabled = false;
    private VerificationType sendTo;

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public VerificationType getSendTo() {
        return sendTo;
    }

    public void setSendTo(VerificationType sendTo) {
        this.sendTo = sendTo;
    }
}
