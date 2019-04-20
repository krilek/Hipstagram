package sceneManager;

import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;

import java.io.IOException;
import java.util.HashMap;

public class SceneManager {
    private HashMap<String, Pane> scenes = new HashMap<>();
    private Scene sceneContainer;

    public SceneManager(Scene sceneContainer) throws IOException {
        this.sceneContainer = sceneContainer;
        addScreen("start", FXMLLoader.load(getClass().getResource("/views/startScreen/startView.fxml")));
        addScreen("main", FXMLLoader.load(getClass().getResource("/views/mainView.fxml")));
    }

    private void addScreen(String name, Pane pane) {
        scenes.put(name, pane);
    }

    protected void removeScreen(String name) {
        scenes.remove(name);
    }

    public void activate(String name) {
        sceneContainer.setRoot(scenes.get(name));
    }

}
