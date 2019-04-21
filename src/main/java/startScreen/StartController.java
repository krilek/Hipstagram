package startScreen;

import app.CurrentSession;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.util.Pair;

import java.io.IOException;
import java.util.HashMap;

public class StartController {
    private static final String[] files = {"/views/startScreen/startButtons.fxml", "/views/startScreen/loginForm.fxml", "/views/startScreen/registerForm.fxml"};
    public StackPane content;
    public Button backButton;
    @FXML
    private
    StartButtonsController startButtonsController;

    private HashMap<String, Pair<Node, FXMLLoader>> possibleViews = new HashMap<>();

    public void initialize() throws IOException {

        for (String file :
                files) {
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(file));
            Node root = fxmlLoader.load();
            possibleViews.put(file, new Pair<>(root, fxmlLoader));
        }
        content.getChildren().clear();
        content.getChildren().add(possibleViews.get(files[0]).getKey());
        startButtonsController = possibleViews.get(files[0]).getValue().getController();

        startButtonsController.LoginButton.setOnAction(e -> CurrentSession.getSceneManager().activate("main"));
//        startButtonsController.LoginButton.setOnAction(e -> changeView(files[1]));
        startButtonsController.RegisterButton.setOnAction(e -> changeView(files[2]));
    }

    public void resetView() {
        backButton.setVisible(false);
        content.getChildren().clear();
        content.getChildren().add(possibleViews.get(files[0]).getKey());
    }

    private void changeView(String fxmlFile) {
        backButton.setVisible(true);
        content.getChildren().clear();
        content.getChildren().add(possibleViews.get(fxmlFile).getKey());
    }
}
