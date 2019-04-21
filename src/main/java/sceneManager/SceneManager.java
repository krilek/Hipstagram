package sceneManager;

import javafx.fxml.FXMLLoader;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Screen;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.HashMap;

public class SceneManager {
    private HashMap<String, Scene> scenes = new HashMap<>();
    private Stage stageContainer;

    public SceneManager(Stage stage) throws IOException {
        this.stageContainer = stage;
        addScreen("start",
                FXMLLoader.load(getClass().getResource("/views/startScreen/startView.fxml")),
                new SceneDims(640, 480));
        addScreen("main",
                FXMLLoader.load(getClass().getResource("/views/mainView.fxml")),
                new SceneDims(1024, 768));
    }

    private void addScreen(String name, Pane pane, SceneDims dimensions) {
        scenes.put(name, new Scene(pane, dimensions.width, dimensions.height));
    }

    protected void removeScreen(String name) {
        scenes.remove(name);
    }

    public void activate(String name) {
        Scene futureScene = scenes.get(name);
        Rectangle2D screenBounds = Screen.getPrimary().getVisualBounds();
        stageContainer.setX((screenBounds.getWidth() - futureScene.getWidth()) / 2);
        stageContainer.setY((screenBounds.getHeight() - futureScene.getHeight()) / 2);
        stageContainer.setScene(futureScene);
    }

}
