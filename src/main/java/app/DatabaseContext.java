package app;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DatabaseContext {

    private static final String PERSISTENCE_UNIT_NAME = "HipstagramPU";
    private static SessionFactory sessionFactory;
    private static EntityManagerFactory factory;

    public static SessionFactory getSessionFactory() {

        if (sessionFactory == null) {
            try {
                Configuration configuration = new Configuration().configure(DatabaseContext.class.getResource("/hibernate.cfg.xml"));
                String dbPath = DatabaseContext.class.getResource("/hipstagram.db").getPath();
                System.out.println(String.format("jdbc:sqlite:%s", dbPath));
                configuration.setProperty("hibernate.connection.url", String.format("jdbc:sqlite:%s", dbPath));
                sessionFactory = configuration.buildSessionFactory();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return sessionFactory;
    }
    public static EntityManagerFactory getEntityManagerFactory(){
        if (factory == null) {
            factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        }
        return factory;
    }

    public static void shutdown() {
        if (sessionFactory != null && sessionFactory.isOpen()) {
            sessionFactory.close();
        }
        if (factory != null) {
            factory.close();
        }
    }
}