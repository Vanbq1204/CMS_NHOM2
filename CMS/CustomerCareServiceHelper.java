package CMS;


/**
 * Generated from IDL interface "CustomerCareService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerCareServiceHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerCareServiceHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_interface_tc("IDL:CMS/CustomerCareService:1.0", "CustomerCareService");
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.CustomerCareService s)
	{
			any.insert_Object(s);
	}
	public static CMS.CustomerCareService extract(final org.omg.CORBA.Any any)
	{
		return narrow(any.extract_Object()) ;
	}
	public static String id()
	{
		return "IDL:CMS/CustomerCareService:1.0";
	}
	public static CustomerCareService read(final org.omg.CORBA.portable.InputStream in)
	{
		return narrow(in.read_Object(CMS._CustomerCareServiceStub.class));
	}
	public static void write(final org.omg.CORBA.portable.OutputStream _out, final CMS.CustomerCareService s)
	{
		_out.write_Object(s);
	}
	public static CMS.CustomerCareService narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.CustomerCareService)
		{
			return (CMS.CustomerCareService)obj;
		}
		else if (obj._is_a("IDL:CMS/CustomerCareService:1.0"))
		{
			CMS._CustomerCareServiceStub stub;
			stub = new CMS._CustomerCareServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
		else
		{
			throw new org.omg.CORBA.BAD_PARAM("Narrow failed");
		}
	}
	public static CMS.CustomerCareService unchecked_narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.CustomerCareService)
		{
			return (CMS.CustomerCareService)obj;
		}
		else
		{
			CMS._CustomerCareServiceStub stub;
			stub = new CMS._CustomerCareServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
	}
}
