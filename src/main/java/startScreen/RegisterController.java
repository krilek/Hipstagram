package startScreen;

import dao.UserDao;
import javafx.event.ActionEvent;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import models.User;
import org.mindrot.jbcrypt.BCrypt;
import validator.AppPattern;
import validator.Validator;

public class RegisterController {

    public PasswordField passwordRepeated;
    public PasswordField password;
    public TextField email;
    public TextField login;

    public void registerUser(ActionEvent actionEvent) {
        if (validateRegisterData()) {
            System.out.println("Prawie dodano");
            User u = new User(login.getText(),
                    BCrypt.hashpw(password.getText(), BCrypt.gensalt()),
                    email.getText(),
                    0);
            UserDao.addUser(u);
            System.out.println("dodano");


        }
    }

    private boolean validateRegisterData() {
        return Validator.validate(login.getText(), AppPattern.Login)
                && Validator.validate(email.getText(), AppPattern.Email)
                && Validator.validate(password.getText(), AppPattern.Password)
                && password.getText().equals(passwordRepeated.getText());
    }
}
