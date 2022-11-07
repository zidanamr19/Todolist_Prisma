const prisma = require('../helpers/database');
const joi = require('joi'); // package validasi

class _todo {
  // Read/Get Todo
  listTodo = async () => {
    try {
      const list = await prisma.todo.findMany();
      console.log(list);

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error('listTodo todo module Error: ', error);

      return {
        status: false,
        error,
      };
    }
  };

  // Create / Post Todo
  createTodo = async (body) => {
    try {
      // Validasi input
      const schema = joi
        .object({
          user_id: joi.number().required(),
          description: joi.string().required(),
          completed: joi.number(),
        })
        .options({ abortEarly: false });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: errorDetails.join(', '),
        };
      }

      const add = await prisma.todo.create({
        data: {
          user_id: body.user_id,
          description: body.description,
          complete: body.completed,
        },
      });

      return {
        status: true,
        code: 201, //sukses membuat create data
        data: add,
      };
    } catch (error) {
      console.error('createTodo todo module Error: ', error);

      return {
        status: false,
        error,
      };
    }
  };

  // Update/Put Todo
  updateTodo = async (body) => {
    try {
      // Validasi input
      const schema = joi
        .object({
          id: joi.number().required(),
          user_id: joi.number(),
          description: joi.string(),
          completed: joi.number(),
        })
        .options({ abortEarly: false });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: errorDetails.join(', '),
        };
      }

      const update = await prisma.todo.update({
        where: {
          id: body.id,
        },
        data: {
          user_id: body.user_id,
          description: body.description,
          complete: body.completed,
        },
      });

      return {
        status: true,
        data: update,
      };
    } catch (error) {
      console.error('updateTodo todo module Error: ', error);

      return {
        status: false,
        error,
      };
    }
  };

  // Delete User
  // Menghapus data user hanya perlu memanggil id saja berupa number
  deleteTodo = async (id) => {
    try {
      const schema = joi.number().required();

      const validation = schema.validate(id);

      if (validation.error) {
        const errorDetails = validate.error.details.map((detail) => detail.message);

        return {
          status: false,
          code: 422,
          error: errorDetails,
        };
      }

      const del = await prisma.todo.delete({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        data: del,
      };
    } catch (error) {
      console.error('deleteTodo todo module Error: ', error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _todo();
