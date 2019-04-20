package startScreen;

import app.CurrentSession;
import dao.UserDao;
import javafx.event.ActionEvent;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import models.User;
import org.mindrot.jbcrypt.BCrypt;
import validator.AppPattern;
import validator.Validator;

public class LoginController {

    public TextField login;
    public PasswordField password;

    public void loginUser(ActionEvent actionEvent) {
        User loggedUser = checkUserDetails();
        if (loggedUser != null) {
            CurrentSession.setCurrentlyLoggedUser(loggedUser);
            CurrentSession.getSceneManager().activate("main");
        }
    }

    private User checkUserDetails() {
        if (Validator.validate(login.getText(), AppPattern.Login) &&
                Validator.validate(password.getText(), AppPattern.Password)) {
            User u = UserDao.getUserByLogin(login.getText());
            if (BCrypt.checkpw(password.getText(), u.getPasswordHash())) {
                return u;
            }
        }
        return null;

    }
}
