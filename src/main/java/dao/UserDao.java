package dao;

import app.DatabaseContext;
import models.User;
import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class UserDao {

    public static void addUser(User user) {
        EntityManager em = DatabaseContext.getEntityManagerFactory().createEntityManager();
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
    }

    public static User getUserByLogin(String login) {
        EntityManager em = DatabaseContext.getEntityManagerFactory().createEntityManager();
        Query query = em.createQuery("from User where login = :login", User.class);
        query.setParameter("login", login);
        return (User) query.getSingleResult();
    }

    public static List<User> getUsers() {

        try (Session session = DatabaseContext.getSessionFactory().openSession()) {

            return session.createQuery("from User", User.class).list();

        }

    }
}

