package startScreen.register;

import javafx.event.ActionEvent;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import validator.AppPattern;
import validator.Validator;

public class RegisterController {

    public PasswordField passwordRepeated;
    public PasswordField password;
    public TextField email;
    public TextField login;

    public void registerUser(ActionEvent actionEvent) {
        if (validateRegisterData()) {
            // Todo: add login log

        }
    }

    private boolean validateRegisterData() {
        return Validator.validate(login.getText(), AppPattern.Login)
                && Validator.validate(email.getText(), AppPattern.Email)
                && Validator.validate(password.getText(), AppPattern.Password)
                && password.getText().equals(passwordRepeated.getText());
    }
}
